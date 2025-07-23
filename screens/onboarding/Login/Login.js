import React, { useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import FormInput from "../../../components/FormInput";
import ButtonInput from "../../../components/Button";
import { AuthContext } from "../../../context/AuthContext";
import AuthTabs from '../../../components/AuthTabs';

const Login = () => {
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(4, 'Too short').required('Password is required'),
    });

    const handleToLogin = async (values, { setSubmitting, setFieldError }) => {
        try {
            const result = await login(values);
            if (result.success) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainApp' }],
                });
            }
        } catch (error) {
            setFieldError('api', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../../assets/images/logo.png")} // Replace with your illustration
                style={styles.logo}
                resizeMode="contain"
            />
            <AuthTabs
                activeTab="login"
                onLoginPress={() => setIsLogin(true)}
                onSignupPress={() => navigation.navigate('Register')}
                />

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleToLogin}
            >
                {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <View style={styles.form}>
                        <FormInput
                            value={values.email}
                            onChangeText={handleChange('email')}
                            placeholder="Email Address"
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <FormInput
                            value={values.password}
                            onChangeText={handleChange('password')}
                            placeholder="Password"
                            secureTextEntry
                        />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgot}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {errors.api && <Text style={styles.error}>{errors.api}</Text>}

                        <ButtonInput
                            value={isSubmitting ? 'Logging in...' : 'Continue'}
                            onPress={handleSubmit}
                            style={styles.button}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    logo: {
        height: 150,
        width: "100%",
        alignSelf: "center",
        marginBottom: 30,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    tab: {
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: "500",
        color: "#999",
        paddingBottom: 4,
    },
    activeTab: {
        color: "#000",
        borderBottomWidth: 2,
        borderBottomColor: "#000",
    },
    form: {
        marginTop: 10,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
    },
    forgot: {
        alignSelf: "flex-end",
        marginVertical: 10,
        color: "#0033A1",
        fontWeight: "600",
    },
    button: {
        backgroundColor: "#E19F21",
        borderRadius: 10,
        marginTop: 10,
    },
});

export default Login;
