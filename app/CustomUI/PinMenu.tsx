import {TextField, Label, Input, FieldError, Text} from 'react-aria-components';

function MyAccessibleTextField() {
    return (
        <TextField>
            <Label>Username</Label>
        <Input />
        <Text slot="description">Enter your desired username.</Text>
    <FieldError />
    </TextField>
);
}
