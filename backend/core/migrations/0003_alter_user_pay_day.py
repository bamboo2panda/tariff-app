# Generated by Django 3.2.3 on 2021-06-03 08:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_user_pay_day'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='pay_day',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
