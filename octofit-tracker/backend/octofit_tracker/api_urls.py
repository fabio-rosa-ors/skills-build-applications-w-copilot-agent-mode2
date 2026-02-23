from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .views import (
    TeamViewSet,
    UserViewSet,
    ActivityViewSet,
    WorkoutViewSet,
    LeaderboardViewSet,
)

router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'users', UserViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboards', LeaderboardViewSet)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({'teams': request.build_absolute_uri('teams/'),
                     'users': request.build_absolute_uri('users/'),
                     'activities': request.build_absolute_uri('activities/'),
                     'workouts': request.build_absolute_uri('workouts/'),
                     'leaderboards': request.build_absolute_uri('leaderboards/')})


urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
]
