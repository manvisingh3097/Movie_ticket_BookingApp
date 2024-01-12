from .models import *
from rest_framework import serializers

class UserSerializer:
    class Meta:
        model = User
        Fields = "__all__"

class MovieSerializer:
    class Meta:
        model = Movie
        Fields = "__all__"

class ScreenSerializer:
    class Meta:
        model = Screen
        Fields = "__all__"

class SeatsSerializer:
    class Meta:
        model = Seats
        Fields = "__all__"

class TicketSerializer:
    class Meta:
        model = Ticket
        Fields = "__all__"