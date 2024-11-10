"""change contactinfo to email

Revision ID: 008e8412db6c
Revises: 1d9543b81b7a
Create Date: 2024-11-10 14:32:45.527568

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '008e8412db6c'
down_revision = '1d9543b81b7a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('performer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=True))
        batch_op.drop_column('contact_info')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('performer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('contact_info', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('email')

    # ### end Alembic commands ###
