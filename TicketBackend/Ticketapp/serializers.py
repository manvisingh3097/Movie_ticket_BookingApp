from .models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"

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