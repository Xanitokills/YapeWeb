"use client";
import React, { useState, useEffect, use } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface Message {
  type: 'success' | 'error' | '';
  text: string;
}

type AuthMode = 'login' | 'signup' | 'forgot';

const Login: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: '', text: '' });
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  // Limpiar mensaje después de 5 segundos
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setMessage({ type: 'error', text: 'El email es requerido' });
      return false;
    }
    
    if (mode !== 'forgot' && !formData.password) {
      setMessage({ type: 'error', text: 'La contraseña es requerida' });
      return false;
    }
    
    if (mode === 'signup') {
      if (!formData.firstName || !formData.lastName) {
        setMessage({ type: 'error', text: 'Nombre y apellido son requeridos' });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
        return false;
      }
      if (formData.password.length < 6) {
        setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
        return false;
      }
    }
    
    return true;
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Login exitoso!' });
        // Aquí redirigirías al usuario o actualizarías el estado global
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'Error en el login' });
      }
    } catch (error) {
      console.error('Error en login:', error);
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
  };

  const handleSignup = async (): Promise<void> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Cuenta creada exitosamente! Revisa tu email para confirmar.' });
        setTimeout(() => setMode('login'), 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Error en el registro' });
      }
    } catch (error) {
      console.error('Error en signup:', error);
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
  };

  const handleForgotPassword = async (): Promise<void> => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Email de recuperación enviado!' });
        setTimeout(() => setMode('login'), 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al enviar email' });
      }
    } catch (error) {
      console.error('Error en forgot password:', error);
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      switch (mode) {
        case 'login':
          await handleLogin();
          break;
        case 'signup':
          await handleSignup();
          break;
        case 'forgot':
          await handleForgotPassword();
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (): void => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
    setMessage({ type: '', text: '' });
  };

  const switchMode = (newMode: AuthMode): void => {
    setMode(newMode);
    resetForm();
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword'): void => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const getTitle = (): string => {
    switch (mode) {
      case 'login': return 'Iniciar Sesión';
      case 'signup': return 'Crear Cuenta';
      case 'forgot': return 'Recuperar Contraseña';
    }
  };

  const getSubtitle = (): string => {
    switch (mode) {
      case 'login': return 'Ingresa a tu cuenta';
      case 'signup': return 'Crea tu nueva cuenta';
      case 'forgot': return 'Te enviaremos un email para restablecer tu contraseña';
    }
  };

  const getButtonText = (): string => {
    if (loading) return 'Procesando...';
    switch (mode) {
      case 'login': return 'Iniciar Sesión';
      case 'signup': return 'Crear Cuenta';
      case 'forgot': return 'Enviar Email';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {getTitle()}
            </h2>
            <p className="text-gray-600">
              {getSubtitle()}
            </p>
          </div>

          {/* Back button for forgot password */}
          {mode === 'forgot' && (
            <button
              onClick={() => switchMode('login')}
              className="flex items-center text-indigo-600 hover:text-indigo-700 mb-4 transition-colors"
              type="button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al login
            </button>
          )}

          {/* Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${
              message.type === 'error' 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Name fields for signup */}
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password fields */}
            {mode !== 'forgot' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Tu contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Confirma tu contraseña"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {getButtonText()}
                </div>
              ) : (
                getButtonText()
              )}
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-3">
            {mode === 'login' && (
              <>
                <button
                  onClick={() => switchMode('forgot')}
                  className="text-indigo-600 hover:text-indigo-700 text-sm transition-colors"
                  type="button"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <div className="text-gray-600 text-sm">
                  ¿No tienes cuenta?{' '}
                  <button
                    onClick={() => switchMode('signup')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                    type="button"
                  >
                    Regístrate
                  </button>
                </div>
              </>
            )}
            
            {mode === 'signup' && (
              <div className="text-gray-600 text-sm">
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  type="button"
                >
                  Inicia sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;