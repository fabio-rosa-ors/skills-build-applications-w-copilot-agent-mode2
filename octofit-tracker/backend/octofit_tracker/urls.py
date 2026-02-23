"""Project URL configuration.

Expose admin and API at the project root. When running inside a Codespace
the root JSON will use the Codespace URL built from the `CODESPACE_NAME`
environment variable so external links point to the correct host.
"""
import os
from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def project_api_root(request):
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        base = f"https://{codespace}-8000.app.github.dev/api/"
        return Response({
            'teams': base + 'teams/',
            'users': base + 'users/',
            'activities': base + 'activities/',
            'workouts': base + 'workouts/',
            'leaderboards': base + 'leaderboards/',
        })

    # fallback to include the app router's root behavior
    from django.shortcuts import redirect
    return redirect('api-root')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', project_api_root, name='project-api-root'),
    path('', include('octofit_tracker.api_urls')),
    path('api-auth/', include('rest_framework.urls')),
]
