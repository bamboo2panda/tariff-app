from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object"""
    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'name', 'plan')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Create a new user with encripted password and return it"""
        return get_user_model().objects.create_user(**validated_data)


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
