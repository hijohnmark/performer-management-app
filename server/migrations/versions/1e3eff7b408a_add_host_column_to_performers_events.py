"""add host column to performers_events

Revision ID: 1e3eff7b408a
Revises: 22b560b98c96
Create Date: 2024-11-13 21:13:00.059537

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e3eff7b408a'
down_revision = '22b560b98c96'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('performers_events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('host', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('performers_events', schema=None) as batch_op:
        batch_op.drop_column('host')

    # ### end Alembic commands ###
