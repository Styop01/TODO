# Generated by Django 4.2.7 on 2023-11-29 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TodoTable',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('content', models.TextField(max_length=300)),
                ('checked', models.TextField(max_length=300)),
            ],
        ),
    ]
