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

class ScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screen
        fields = "__all__"

class SeatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seats
        fields = "__all__"

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"