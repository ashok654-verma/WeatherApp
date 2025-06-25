import React from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { getButtonGradient } from '../theme/weatherTheme';

interface Props {
    city: string;
    onChange: (text: string) => void;
    onSubmit: () => void;
    currentWeatherCondition?: string
}

const CityInput = ({ city, onChange, onSubmit, currentWeatherCondition }: Props) => (
    <View style={styles.row}>
        <TextInput
            value={city}
            onChangeText={onChange}
            placeholder="Enter city"
            placeholderTextColor={colors.white}
            style={styles.input}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.buttonWrapper}>
            <LinearGradient
                colors={getButtonGradient(currentWeatherCondition)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
            >
                <Text style={styles.textStyle}>Search</Text>
            </LinearGradient>
        </TouchableOpacity>


    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 16,
    },

    input: {
        flex: 1,
        borderColor: colors.slat_grey,
        borderWidth: 1,
        marginRight: 10,
        padding: 16,
        borderRadius: 6,
        color: colors.white,

        fontWeight: '500',
        fontSize: 16
    },
    searchBtn: {
        padding: 14,
        backgroundColor: colors.soft_sky_blue,
        borderRadius: 6
    },
    textStyle: {
        color: colors.white
    },
    gradientWrapper: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    buttonGradient: {
        height: 48,
        width: 100, // fixed or responsive width
        borderRadius: 6,
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonWrapper: {
        height: 48,
        width: 100,
        borderRadius: 6,
        overflow: 'hidden',
    },


});

export default CityInput;
