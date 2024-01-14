from .views import *
from django.urls import path, include

urlpatterns = [

    path("user", UserView.as_view(), name="User-View"),
    path("movies", MovieView.as_view(), name="Movie-View"),

]