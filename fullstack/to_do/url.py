from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('todolist/put/<int:pk>/', TodoApiView.as_view()),
    path('todolist/del/<int:pk>/', TodoApiView.as_view()),
    path('get/', TodoApiView.as_view()),
    path('post/', TodoApiView.as_view()),
    path('', views.home)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
