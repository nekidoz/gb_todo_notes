from django.core.management import BaseCommand, CommandError
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Creates superuser with the specified name, password and email address."

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('email', type=str)

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']
        email = options['email']
        self.stdout.write("Creating superuser: username=%s, password=%s, email=%s" % (username, password, email))

        user_model = get_user_model()
        try:
            user_model.objects.create_superuser(username=username, password=password, email=email)
        except Exception as e:
            # Will not raise exception as this will abort the Docker scenario
            self.stdout.write("Exception: %s" % e)
            # raise CommandError("Exception: %s" % e)
