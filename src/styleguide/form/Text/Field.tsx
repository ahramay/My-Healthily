import React, { useMemo, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Icon from '@material-ui/core/Icon';
import {
    VALIDATION_ERROR_REQUIRED,
    VALIDATION_ERROR_INCORRECT,
    TEXT_AREA_MAX_LENGTH,
    MIN_LENGTH_DEFAULT,
} from 'utility/constants';
import { Palette } from 'utility/Colors/Palette';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginRight: 4,
                '& > * + *': {
                marginRight: theme.spacing(6),
            },
        },
        inputStyle: {
            width: '100%',
            minHeight: 80,
            maxHeight: 80,
            borderRadius: 4,
            padding: 10,
            fontSize: 16,
            fontWeight: 400,
            color: Palette.Base.Black,
            backgroundColor: Palette.Base.White,
            border: `solid 1px ${Palette.Grey.Light}`,
            '&: active': {
                border: `solid 1px ${Palette.Grey.Light}`,
            }
        }
    }),
);

const validateField = (
  rawValue: string,
  required?: boolean,
  pattern?: RegExp,
  minLength?: number,
  errorMessage?: string
) => {
  const value = ('' + rawValue || '').trimLeft();

  if (!value && required) {
    return VALIDATION_ERROR_REQUIRED;
  }

  if (value && pattern && !value.match(pattern)) {
    return VALIDATION_ERROR_INCORRECT;
  }

  if (value && minLength && value.length < minLength) {
    return VALIDATION_ERROR_INCORRECT;
  }

  if (errorMessage) {
    return errorMessage;
  }
};

export interface Props {
    required?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    multiline?: boolean;
    hideLabel?: boolean;
    select?: boolean;
    name: string;
    label?: string;
    value?: string;
	disabled?: boolean;
    defaultValue?: string;
    tabIndex?: number;
    helperText?: string;
    errorMessage?: string;
    icon?: string;
    selectOptions?: any;
    selectLabel?: string;
    maxLength?: number | null;
    minLength?: number;
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    rows?: number;
    type?: 'text' | 'password' | 'date' | 'select' | 'autoComplete' | 'textArea';
    inputPattern?: RegExp;
    validationPattern?: RegExp;
    onChange?: (val: any, name: string) => void | undefined;
}

const TextFieldInput: React.FC<Props> = ({
    required,
    error=false,
    fullWidth=true,
    multiline=false,
    hideLabel=false,
    name = '',
    label = '',
    value = '',
	disabled = false,
    defaultValue = '',
    tabIndex = undefined,
    helperText = '',
    errorMessage = '',
    icon = '',
    selectOptions,
    selectLabel='',
    maxLength = TEXT_AREA_MAX_LENGTH,
    minLength = MIN_LENGTH_DEFAULT,
    variant = 'outlined',
    size,
    rows,
    type = 'text',
    inputPattern,
    validationPattern,
    onChange,
}) => {
    const classes = useStyles();
    const [helperTextValue, setHelperTextValue] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>(value);
    const [inputError, setInputError] = useState<boolean>(error);

    const valid = validateField(value, required, validationPattern, minLength, errorMessage) || '';

    const handleInput = ({ target: { value } }: React.ChangeEvent<{ name: string; value: any }>) => {
        if (value && inputPattern && !value.match(inputPattern)) {
            return;
        }
        onChange?.(value, name);
    };

    const inputProps = useMemo(() => ({ maxLength, tabIndex }), [maxLength, tabIndex]);

    useEffect(() => {
        if (defaultValue !== '' && value?.length === 0) {
            setInputValue(defaultValue);
        } else {
            setInputValue(value);
        }
        if (valid && valid !== '' && value?.length > 0) {
            setInputError(true);
            setHelperTextValue(valid);
        } else {
            setInputError(false);
            setHelperTextValue('');
        }
    }, [valid, value, defaultValue]);

    const [autoCompleteValue, setAutoCompleteValue] = useState<any>(null);

    const optionValueSet = useMemo(() => {
        if (!selectOptions) return [];
        let items = [];
        if (selectLabel !== '') {
            const optionData = {
                value: '0', label: !hideLabel ? selectLabel : ''
            };
            items.push(optionData);
        }
        for(let item of selectOptions) {
            items.push(item);
        }
        return items;
    }, [selectLabel, hideLabel, selectOptions]);

    useEffect(() => {
        if (type && type !== 'autoComplete') return;
        if(selectOptions) {
             if (value) {
                const selectedOption = getSelectedOptionLabelIndex(value, selectOptions)?.[0] || null;
                if(selectedOption) {
                    setAutoCompleteValue(selectedOption);
                }
             } else {
                setAutoCompleteValue({
                    value: '0', label: ''
                });
             }
            
        }
    }, [value, type, selectOptions]);

    const getSelectedOptionLabelIndex = (value: string | null, options: any) => {
        const optionIndex = options?.filter((item: any) => {
            return (item?.value) === value;
        });
        return optionIndex;
    }

    return (
        <Box className={classes.root}>
			{(type === 'text' || type === 'password') && 
				<TextField
					required={required}
					error={inputError}
					id={`id-${name}`}
					name={name}
					label={label}
					defaultValue={inputValue}
	//					value={inputValue}
					variant={variant}
					type={type}
					disabled={disabled}
					size={size}
					helperText={inputError ? helperTextValue : helperText}
					fullWidth={fullWidth}
					onChange={handleInput}
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={inputProps}
					multiline={multiline}
					rows={rows}
					style={{ backgroundColor: Palette.Base.White}}
				/>
			}
				{(type === 'date') && 
				<TextField
					required={required}
					error={inputError}
					id={`id-${name}`}
					name={name}
					label={label}
//					defaultValue={inputValue}
					value={inputValue}
					variant={variant}
					type={type}
					disabled={disabled}
					size={size}
					helperText={inputError ? helperTextValue : helperText}
					fullWidth={fullWidth}
					onChange={handleInput}
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={inputProps}
					multiline={multiline}
					rows={rows}
					style={{ backgroundColor: Palette.Base.White}}
				/>
			}
            {type === 'select' &&
                <Box position="relative" width={1}>
                    {hideLabel && (inputValue === '' || inputValue === '0') && 
                        <Box fontSize={16} width={'auto'} position="absolute" zIndex={1} top={size === 'small' ? 8 : 18} left={15}>{selectLabel}</Box>
                    }
                    <TextField
                        id={`id-${name}`}
                        select
                        label={label}
                        value={inputValue}
                        onChange={handleInput}
                        size={size}
						disabled={disabled}
                        fullWidth={fullWidth}
                        SelectProps={{
                            native: true,
                            fullWidth: fullWidth,
                        }}
                        helperText={inputError ? helperTextValue : helperText}
                        variant={variant}
                        style={{ backgroundColor: Palette.Base.White, display: 'block', width: '100%'}}
                        >
                        {optionValueSet?.map((option: any) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Box>
            }
            {type === 'autoComplete' &&
                <Box position="relative" width={1} height={1}>
                {icon !== '' && 
                    <Box position="absolute" right={10} top={16} zIndex={1} bgcolor={Palette.Base.White}><Icon>{icon}</Icon></Box>
                }
                <Autocomplete
                    freeSolo
                    id={`id-${name}`}
                    disableClearable
                    options={selectOptions}
                    getOptionLabel={(option) => option.label}
                    value={autoCompleteValue}
                    onChange={(event: any, newValue: string | null) => {
                        if (event) {
                            let fieldValue: any = newValue;
                            onChange?.((fieldValue?.value || '').toString(), name);
                        }
                    }}
                    onInputChange={(event, newInputValue: string | null) => {
                        if (event) {
                            let fieldValue: any = newInputValue;
                            onChange?.((fieldValue?.value || '').toString(), name);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label={label}
                        variant={variant}
                        size={size}
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                    )}
                    style={{ backgroundColor: Palette.Base.White}}
                />
                </Box>
            }
            {type === 'textArea' &&
                <TextareaAutosize
                    id={`id-${name}`}
                    rowsMax={rows ? rows : 1}
                    aria-label={label}
                    defaultValue={inputValue}
                    className={classes.inputStyle}
					onChange={handleInput}
					style={{ backgroundColor: Palette.Base.White}}
                />
                
            }
        </Box>
    )
}

export default React.memo(TextFieldInput);