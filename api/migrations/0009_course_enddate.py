# Generated by Django 3.0.5 on 2020-05-08 16:23

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20200421_1755'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='endDate',
            field=models.DateField(default=datetime.datetime(2020, 5, 8, 16, 23, 5, 351193, tzinfo=utc)),
        ),
    ]
