use std::fs;
use std::path::Path;
use log::LevelFilter;
use chrono::{Duration, Local, NaiveDate};
use crate::pwmanager::error::Error;

pub fn initialize(logs_folder: &Path) -> Result<(), Error> {
  if !logs_folder.exists() {
    fs::create_dir(&logs_folder)?;
  }
  let log_file = Local::now().format("%Y-%m-%d.log").to_string();
  fern::Dispatch::new()
    .format(|out, message, record| {
      out.finish(format_args!(
        "[{}][{}] {}",
        Local::now().format("%Y-%m-%d %H:%M:%S"),
        record.level(),
        message,
      ));
    })
    .level(if cfg!(debug_assertions) { log::LevelFilter::Debug } else { LevelFilter::Info })
    .chain(std::io::stdout())
    .chain(fern::log_file(logs_folder.join(log_file))?)
    .apply()?;
  Ok(())
}

pub fn remove_old(log_folder: &Path) -> Result<(), Error> {
  let deletion_point = Local::now().naive_local() - Duration::days(3);
  for e in fs::read_dir(log_folder)? {
    let path = e?.path();
    if !path.is_file() || path.extension().map_or(false, |e| e != "log") {
      continue;
    }
    let file_stem = path.file_stem().unwrap().to_string_lossy();
    let log_time = match NaiveDate::parse_from_str(&file_stem, "%Y-%m-%d") {
      Ok(d) => d.and_hms_opt(0, 0, 0).unwrap(),
      Err(_) => continue,
    };
    if log_time < deletion_point {
      info!("removing old log file", file=path.file_name().unwrap().to_string_lossy());
      fs::remove_file(path)?;
    }
  }
  Ok(())
}

#[doc(hidden)]
macro_rules! __log_arguments {
  // Parse a `key=value` argument, into `"key={}", value`
  ($level:expr, $prefix:literal, $fmt:expr $(, $args:expr)* ; $k:ident=$v:expr, $($tokens:tt)*) => {
    $crate::pwmanager::logs::__log_arguments!($level, ", ", concat!($fmt, $prefix, stringify!($k), "={}") $(, $args)*, $v ; $($tokens)*)
  };
  // Parse a `key=?value` argument, into `"key={:?}", value`
  ($level:expr, $prefix:literal, $fmt:expr $(, $args:expr)* ; $k:ident=?$v:expr, $($tokens:tt)*) => {
    $crate::pwmanager::logs::__log_arguments!($level, ", ", concat!($fmt, $prefix, stringify!($k), "={:?}") $(, $args)*, $v ; $($tokens)*)
  };
  // Parse a `key` argument, into `"key={}", key`
  ($level:expr, $prefix:literal, $fmt:expr $(, $args:expr)* ; $k:ident, $($tokens:tt)*) => {
    $crate::pwmanager::logs::__log_arguments!($level, ", ", concat!($fmt, $prefix, stringify!($k), "={}") $(, $args)*, $k ; $($tokens)*)
  };
  // Output the final log expression
  ($level:expr, $_:literal, $fmt:expr $(, $args:expr)* ; $(,)?) => {
    ::log::log!($level, $fmt, $($args),*)
  };
}

#[doc(hidden)]
macro_rules! __log_impl {
  ($level:expr, $msg:literal, $($tokens:tt)*) => {
    $crate::pwmanager::logs::__log_arguments!($level, ": ", $msg ; $($tokens)*)
  };
}

macro_rules! debug { ($($tokens:tt)+) => { $crate::pwmanager::logs::__log_impl!(::log::Level::Debug, $($tokens)+,) } }
macro_rules! info  { ($($tokens:tt)+) => { $crate::pwmanager::logs::__log_impl!(::log::Level::Info,  $($tokens)+,) } }
macro_rules! _warn { ($($tokens:tt)+) => { $crate::pwmanager::logs::__log_impl!(::log::Level::Warn,  $($tokens)+,) } }
macro_rules! error { ($($tokens:tt)+) => { $crate::pwmanager::logs::__log_impl!(::log::Level::Error, $($tokens)+,) } }

pub(crate) use { __log_impl, __log_arguments };
#[allow(unused)] pub(crate) use { debug, info, _warn as warn, error };