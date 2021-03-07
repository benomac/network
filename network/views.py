from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .forms import NewPostForm
from django.http import JsonResponse
from django.core import serializers

from .models import User, UserPosts


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def new_post(request):
    if request.method == "POST":
        user = request.user
        form = NewPostForm(request.POST)
        if form.is_valid():
            # Get data from form
            # Argument in [] HAS to be form element name!!
            post = form.cleaned_data["post"]
            new_post = UserPosts.objects.create(user=user, post=post)
            new_post.save()
            return render(request, "network/index.html", {
        "form":NewPostForm()
    })
        print(post)
    
    return render(request, "network/new_post.html", {
        "form":NewPostForm()
    })

def all_posts(request):
    # user = request.user
    posts = UserPosts.objects.all()
    
    posts = posts.order_by("-timestamp").all()
    print(posts)
    return JsonResponse([post.serialize() for post in posts], safe=False)
    

def load_profile(request):
    profile_content = UserPosts.objects.filter(user=request.user)
    print("isaid", profile_content[0].post)
    return JsonResponse([post.serialize() for post in profile_content], safe=False)



    