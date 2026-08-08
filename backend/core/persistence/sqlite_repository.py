"""
SQLite Repository.
"""

import sqlite3
import json

from core.persistence import (
    BaseRepository
)


class SQLiteRepository(
    BaseRepository
):

    def __init__(
        self,
        database="agentforge.db"
    ):

        self.connection = sqlite3.connect(

            database,

            check_same_thread=False

        )

        self.cursor = self.connection.cursor()

        self._create_table()

    def _create_table(
        self
    ):

        self.cursor.execute(

            """
            CREATE TABLE IF NOT EXISTS records (

                id TEXT PRIMARY KEY,

                value TEXT

            )
            """

        )

        self.connection.commit()

    def save(
        self,
        key,
        value
    ):

        payload = json.dumps(

            value,

            default=str

        )

        self.cursor.execute(

            """
            INSERT OR REPLACE INTO records
            (id, value)
            VALUES (?, ?)
            """,

            (

                key,

                payload

            )

        )

        self.connection.commit()

    def get(
        self,
        key
    ):

        self.cursor.execute(

            """

            SELECT value

            FROM records

            WHERE id=?

            """,

            (

                key,

            )

        )

        row = self.cursor.fetchone()

        if row is None:

            return None

        return json.loads(

            row[0]

        )

    def delete(
        self,
        key
    ):

        self.cursor.execute(

            """

            DELETE FROM records

            WHERE id=?

            """,

            (

                key,

            )

        )

        self.connection.commit()

    def all(
        self
    ):

        self.cursor.execute(

            """

            SELECT id,value

            FROM records

            """

        )

        rows = self.cursor.fetchall()

        return {

            key: json.loads(value)

            for key, value

            in rows

        }

    def close(
        self
    ):

        self.connection.close()