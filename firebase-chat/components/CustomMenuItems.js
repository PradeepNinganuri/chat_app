import { View, Text, StyleSheet } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const MenuItem = ({ text, action, value, icon }) => (
    <MenuOption onSelect={() => action(value)}>
        <View style={styles.menuItem}>
            <Text style={[styles.menuText, { fontSize: hp(1.7) }]}>
                {text}
            </Text>
            {icon}
        </View>
    </MenuOption>
);

const styles = StyleSheet.create({
    menuItem: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuText: {
        fontWeight: '600', 
        color: '#525252', 
    },
});
