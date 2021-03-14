
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("new_post", views.new_post, name="new_post"),

    #API's
    path("all_posts", views.all_posts, name="all_posts"),
    path("load_profile/<str:user>", views.load_profile, name="load_profile"),
    path("get_foll/<str:user>", views.get_foll, name="get_foll"),
    path("following/<int:to_follow>", views.following, name="following"),
    path("follow_or_un", views.follow_or_un, name="follow_or_un")
]


