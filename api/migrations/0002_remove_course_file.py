# Generated by Django 3.0.5 on 2020-04-12 17:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='file',
        ),
    ]
