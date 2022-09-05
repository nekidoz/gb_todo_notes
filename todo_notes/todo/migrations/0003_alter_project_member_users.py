# Generated by Django 4.1 on 2022-09-05 15:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todo', '0002_alter_project_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='member_users',
            field=models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]