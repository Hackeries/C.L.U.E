"""Project initialization hooks.

This file conditionally enables PyMySQL as a drop-in replacement for MySQLdb
when a MySQL DATABASE_URL is provided. This avoids requiring the compiled
`mysqlclient` package in environments (like Vercel) where MySQL dev libraries
are unavailable during build.
"""

from __future__ import annotations

import os
from urllib.parse import urlparse


def _enable_pymysql_if_needed() -> None:
    db_url = os.environ.get("DATABASE_URL", "")
    try:
        if db_url:
            scheme = urlparse(db_url).scheme.split("+")[0]
            if scheme == "mysql":
                import pymysql  # type: ignore

                pymysql.install_as_MySQLdb()
    except Exception:
        # If anything goes wrong here, silently continue — Django will error at
        # runtime with a clear message if the DB driver is actually required.
        pass


_enable_pymysql_if_needed()

