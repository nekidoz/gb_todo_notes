from django.db import models

from users.models import User


# Create your models here.
class Project(models.Model):
    name = models.CharField(blank=False, null=False, max_length=128)
    repository_url = models.URLField(blank=True, null=True, max_length=1024)
    member_users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.PROTECT)
    text = models.TextField(blank=False, null=False, max_length=4096)
    date_created = models.DateTimeField(blank=False, null=False, auto_now_add=True, auto_now=False)
    date_updated = models.DateTimeField(blank=False, null=False, auto_now_add=False, auto_now=True)
    creator_user = models.ForeignKey(User, on_delete=models.PROTECT)
    is_active = models.BooleanField(blank=False, null=False, default=True)
