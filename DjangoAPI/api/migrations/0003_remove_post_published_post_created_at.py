# Generated by Django 4.2.5 on 2024-04-14 12:35

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_userdata_groups_userdata_user_permissions'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='published',
        ),
        migrations.AddField(
            model_name='post',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]