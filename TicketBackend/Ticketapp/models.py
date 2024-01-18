from django.db import models
from djongo import models as djongo_models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


#create user with both functionality as normal user and a super user
class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username is required")
        user= self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username , password , **extra_fields):
        user = self.create_superuser(username, password , **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

# Create your models here.
class User(AbstractBaseUser):
    _id = djongo_models.ObjectIdField() 
    username = models.CharField(max_length=32, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField()
    mobile_num = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"

    objects = UserManager()

    def __str__(self) -> str:
        return self.username

    # check whether user is admin/superuser and return true and then let the user login and access admin panel 
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_perm(self, perm, app_label):
        return self.is_superuser


class Movie(models.Model):
    moviename = models.CharField(max_length=200, unique=True)
    rate_star = models.FloatField(default = 0)
    genre = models.CharField(max_length=100)
    language = models.CharField(max_length= 100)
    run_timing = models.IntegerField()
    release_date = models.DateField()
    image = models.URLField()
    location = models.CharField(max_length=100)

    #whenevr we create a class of user and print them  
    def __str__(self):
        return self.moviename

class Theater(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE , related_name= "theaters")
    ##maybe we n eed seat as a foreign key not sure
    theater_name = models.CharField(max_length=255)
    city = models.CharField(max_length = 100)
    movie_time = models.DateTimeField()
    seat_type = models.CharField(max_length=100)
    available_seats = models.IntegerField()

    def __str__(self) -> str:
        return self.theater_name

class Seats(models.Model):
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE )
    seat_number = models.CharField(max_length=6)
    is_reserver = models.BooleanField(default=False)
    row = models.CharField(max_length=10)
    seat_type = models.CharField(max_length=50)
    seat_price = models.FloatField(default=0.00)
    available_seats_flag = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.theater_name}- {self.movie.title}-seat{self.seat_number}"

class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.FloatField()
    seats = models.ManyToManyField(Seats)
    

    

