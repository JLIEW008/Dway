# Generated by Django 2.1.2 on 2018-11-12 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PictureLocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=200)),
                ('lat', models.FloatField(max_length=200)),
                ('lng', models.FloatField(max_length=200)),
            ],
        ),
    ]
