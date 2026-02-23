from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
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


def _codespace_base():
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        return f"https://{codespace}-8000.app.github.dev/api/"
    return None


@api_view(['GET'])
def api_root(request, format=None):
    base = _codespace_base()
    if base:
        return Response({
            'teams': base + 'teams/',
            'users': base + 'users/',
            'activities': base + 'activities/',
            'workouts': base + 'workouts/',
            'leaderboards': base + 'leaderboards/',
        })

    # fallback to request-based URLs
    return Response({
        'teams': request.build_absolute_uri('teams/'),
        'users': request.build_absolute_uri('users/'),
        'activities': request.build_absolute_uri('activities/'),
        'workouts': request.build_absolute_uri('workouts/'),
        'leaderboards': request.build_absolute_uri('leaderboards/'),
    })


urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
]
