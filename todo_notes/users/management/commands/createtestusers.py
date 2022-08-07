from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

import random, string


class Command(BaseCommand):
    help = "Creates users specified as arguments. If username starts with 'super', it will be a superuser."

    def add_arguments(self, parser):
        parser.add_argument('usernames', nargs="+", type=str)

    @staticmethod
    def random_alphanumeric_password() -> str:
        symbols = string.ascii_lowercase + string.ascii_uppercase + string.digits
        length = 12
        return ''.join(random.choice(symbols) for i in range(length))

    def handle(self, *args, **options):
        user_model = get_user_model()
        for username in options['usernames']:
            try:
                if username.upper().startswith("SUPER"):
                    self.stdout.write("Superuser: %s %s" % (username, self.random_alphanumeric_password()))
                    new_user = user_model.objects.create_superuser(
                        username=str(username),
                        password=self.random_alphanumeric_password(),
                        email=self.random_alphanumeric_password() + "@nowhere.com"
                    )
                else:
                    self.stdout.write("User: %s %s" % (username, self.random_alphanumeric_password()))
                    new_user = user_model.objects.create_user(
                        username=str(username),
                        password=self.random_alphanumeric_password(),
                        email=self.random_alphanumeric_password() + "@nowhere.com"
                    )
                new_user.save()
            except Exception as e:
                raise CommandError("Exception: %s" % e)
                #userModel.objects.create
