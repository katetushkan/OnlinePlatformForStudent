# Generated by Django 3.0.5 on 2020-04-20 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_filestocourse'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filestocourse',
            name='filename',
            field=models.FileField(null=True, upload_to='attachments'),
        ),
    ]
