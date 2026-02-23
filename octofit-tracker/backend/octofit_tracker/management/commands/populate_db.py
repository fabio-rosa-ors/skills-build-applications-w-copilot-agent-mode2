from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard
import datetime


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel', description='Marvel team')
        dc = Team.objects.create(name='dc', description='DC team')

        # Create sample superhero users
        heroes = [
            ('Tony Stark', 'tony@stark.com', marvel),
            ('Steve Rogers', 'steve@avengers.com', marvel),
            ('Bruce Wayne', 'bruce@wayne.com', dc),
            ('Clark Kent', 'clark@dailyplanet.com', dc),
        ]

        users = []
        for name, email, team in heroes:
            users.append(User.objects.create(name=name, email=email, team=team))

        # Add activities for each user
        today = datetime.date.today()
        for u in users:
            Activity.objects.create(user=u, type='run', duration=30, date=today)
            Activity.objects.create(user=u, type='cycle', duration=45, date=today)

        # Create workouts and associate suggested users
        w1 = Workout.objects.create(name='Strength', description='Full body strength')
        w1.suggested_for.set([users[0], users[2]])

        w2 = Workout.objects.create(name='Cardio', description='Cardio blast')
        w2.suggested_for.set([users[1], users[3]])

        # Create leaderboards
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=80)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
