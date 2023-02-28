use sea_orm::error::DbErr as DatabaseError;
use serde::{ser::SerializeStruct, Serialize};
use thiserror::Error;

#[derive(Debug, Error)]
pub struct MyError {
    pub name: String,
    pub cause: String,
}

impl MyError {
    pub fn to_oh_my_error(cause: &str) -> OhMyError {
        OhMyError::Common(MyError {
            cause: cause.into(),
            name: "CommonError".into(),
        })
    }
}

impl std::fmt::Display for MyError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

#[derive(Debug, Error)]
pub enum OhMyError {
    #[error(transparent)]
    Database(#[from] DatabaseError),
    #[error("common error")]
    Common(#[from] MyError),
}

impl Serialize for OhMyError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut seq = serializer.serialize_struct("Error", 2)?;

        match self {
            OhMyError::Database(e) => {
                seq.serialize_field("name", "DatabaseError")?;
                seq.serialize_field("cause", &e.to_string())?;
            }
            OhMyError::Common(e) => {
                seq.serialize_field("name", &e.name)?;
                seq.serialize_field("cause", &e.cause)?;
            }
        }

        seq.end()
    }
}
