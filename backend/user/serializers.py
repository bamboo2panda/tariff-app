from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers

from core.models import Plan


class PlanSerializer(serializers.ModelSerializer):
    """Serializer for plan objects"""

    class Meta:
        model = Plan
        fields = ('id', 'name')
        read_only_fields = ('id',)


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object"""
    plan = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Plan.objects.all()
    )

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'name', 'plan', 'pay_day')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encripted password and return it"""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting a password and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for user authentication object"""
    username = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=username,
            password=password,
        )
        if not user:
            msg = 'Неверные логин или пароль'
            raise serializers.ValidationError(msg, code='authentication')
        attrs['user'] = user
        return attrs
