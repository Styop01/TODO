# Generated by Django 4.2.2 on 2023-12-02 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('to_do', '0005_todotable_checked'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todotable',
            name='checked',
            field=models.TextField(max_length=10),
        ),
    ]