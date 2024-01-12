from django.shortcuts import render
from django.views import views
import json

# Create your views here.

class UserView(APIView):
    def get(self, request):
