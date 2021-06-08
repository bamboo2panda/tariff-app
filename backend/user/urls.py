from django.urls import path

from user import views

app_name = 'user'

urlpatterns = [
     path('create/', views.CreateUserView.as_view(), name='create'),
     path('token/', views.CreateTokenView.as_view(), name='token'),
     path('me/', views.ManageUserView.as_view(), name='me'),
     path('update_payday/',
          views.UpdatePaydayView.as_view(),
          name='update_payday'),
     path('drop_payday/',
          views.DropPaydayView.as_view(),
          name='drop_payday'),
     path('is_plan_paid/',
          views.CheckPlanPaimentView.as_view(),
          name='is_plan_paid'),
     path('get_plans_list/',
          views.GetPlansList.as_view(),
          name='get_plans_list')
]
