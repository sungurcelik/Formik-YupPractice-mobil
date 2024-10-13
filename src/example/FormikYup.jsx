import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Button, Input, Toggle} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as Yup from 'yup';

const {width, height} = Dimensions.get('window');

const FormikYup = () => {
  const registerScheme = Yup.object().shape({
    name: Yup.string().required('Zorunlu Alan'),
    surname: Yup.string().required('Zorunlu Alan'),
    email: Yup.string()
      .required('Zorunlu Alan')
      .email('Lütfen geçerli bir Email adresi giriniz!'),
    phone: Yup.string()
      .min(11, 'Minimum 11 hane olmalı!!')
      .max(15, 'maksimum 15 hane olmalı')
      .required('Zorunlu Alan'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Şifre için şartlar sağlanmıyor',
      ),
    passwordConfirm: Yup.string()
      .required('Zorunlu Alan')
      .oneOf([Yup.ref('password')], 'Şifreler Uyuşmuyor'),
    aggrementConfirm: Yup.bool()
      .required('Zorunlu Alan')
      .oneOf([true], 'Sözleşmeyi onaylamanız gerekiyor.'),
  });

  return (
    <View style={styles.container}>
      {/* Başlık Kısmı */}
      <View
        style={{
          padding: 20,
          backgroundColor: '#00E096',
          minHeight: width * 0.2,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          KAYIT OLUŞTUR
        </Text>
      </View>
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <Formik
            initialValues={{
              email: '',
              name: '',
              surname: '',
              phone: '',
              password: '',
              passwordConfirm: '',
              aggrementConfirm: false,
            }}
            onSubmit={values =>
              Alert.alert('Kişi Bilgileri', JSON.stringify(values, null, 2))
            }
            validationSchema={registerScheme}>
            {
              // handleBlur fokus ile ilgili
              ({handleChange, handleSubmit, values, setFieldValue, errors}) => (
                <View>
                  <Input
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.name}
                    label={'İsim'}
                    placeholder="İsim Bilgisi Giriniz..."
                    onChangeText={handleChange('name')}
                    status={errors.name ? 'danger' : 'basic'}
                    caption={errors.name}
                  />
                  <Input
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.surname}
                    label={'Soyisim'}
                    placeholder="Soyisim Bilgisi Giriniz..."
                    onChangeText={handleChange('surname')}
                    status={errors.surname ? 'danger' : 'basic'}
                    caption={errors.surname}
                  />
                  <Input
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.email}
                    label={'E-mail'}
                    placeholder="Email Bilgisi Giriniz..."
                    onChangeText={handleChange('email')}
                    status={errors.email ? 'danger' : 'basic'}
                    caption={errors.email}
                  />
                  <Input
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.phone}
                    label={'Telefon'}
                    placeholder="Telefon Bilgisi Giriniz..."
                    onChangeText={handleChange('phone')}
                    status={errors.phone ? 'danger' : 'basic'}
                    caption={errors.phone}
                  />
                  <Input
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.password}
                    label={'Şifre'}
                    placeholder="Şifre Bilgisi Giriniz..."
                    onChangeText={handleChange('password')}
                    status={errors.password ? 'danger' : 'basic'}
                    caption={errors.password}
                  />
                  <Input
                    size="large"
                    style={{marginVertical: 10}}
                    value={values.passwordConfirm}
                    label={'Şifre Tekrar'}
                    placeholder="Şifre Tekrarını Giriniz..."
                    onChangeText={handleChange('passwordConfirm')}
                    status={errors.passwordConfirm ? 'danger' : 'basic'}
                    caption={errors.passwordConfirm}
                  />
                  <View style={{maxWidth: width * 0.92}}>
                    <Toggle
                      checked={values.aggrementConfirm}
                      onChange={value =>
                        setFieldValue('aggrementConfirm', value)
                      }>
                      Kullanıcı Sözleşmesini ve Gizlilik Anlaşmasını kabul
                      ediyorum.
                    </Toggle>
                    {errors.aggrementConfirm && (
                      <Text style={{color: 'red'}}>
                        {errors.aggrementConfirm}
                      </Text>
                    )}
                  </View>

                  <Button
                    style={{marginTop: 30}}
                    onPress={handleSubmit}
                    status="success">
                    KAYDET
                  </Button>
                </View>
              )
            }
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
