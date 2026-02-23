"""Project URL configuration.

Expose admin and API at the project root. The API router lives in `api_urls.py`.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('octofit_tracker.api_urls')),
    path('api-auth/', include('rest_framework.urls')),
]
