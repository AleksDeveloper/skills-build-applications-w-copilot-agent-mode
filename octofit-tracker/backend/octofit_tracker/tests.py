from django.test import TestCase
from django.contrib.auth.models import User
from .models import Team, Activity, Leaderboard, Workout

class TeamModelTest(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')

class ActivityModelTest(TestCase):
    def test_activity_creation(self):
        activity = Activity.objects.create(name='Test', user='user', team='team', duration=10)
        self.assertEqual(str(activity), 'Test by user')

class LeaderboardModelTest(TestCase):
    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(team='Test', points=100)
        self.assertEqual(str(lb), 'Test: 100')

class WorkoutModelTest(TestCase):
    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test', description='desc', difficulty='Easy')
        self.assertEqual(str(workout), 'Test')
