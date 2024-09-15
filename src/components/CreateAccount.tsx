import {CvInfo} from "@/schemas/cv_info";
import React, {useEffect, useState} from "react";
import {Alignment, Offices} from "@/schemas/offices";
import {Country} from "@/schemas/country";
import ContainerBox from "@/components/Container/ContainerBox";
import ContainerHeader from "@/components/Container/ContainerHeader";
import TextInput from "@/components/Inputs/TextInput";
import SelectInput from "@/components/Inputs/SelectInput";
import Button from "@/components/Inputs/Button";
import CheckboxInput from "@/components/Inputs/CheckboxInput";

type ValidationResult = {
    valid: boolean;
    errors: string[];
}

type FormValidation = {
    firstName: ValidationResult;
    lastName: ValidationResult;
    email: ValidationResult;
    phone: ValidationResult;
    password: ValidationResult;
    selectedOffice: ValidationResult;
    selectedAlignment: ValidationResult;
    consentProvided: ValidationResult;
}

type Props = {
    cvInfo: CvInfo;
}

export default function CreateAccount(props: Props) {
    const [firstName, setFirstName] = useState<string>(props.cvInfo.first_name);
    const [lastName, setLastName] = useState<string>(props.cvInfo.last_name);
    const [email, setEmail] = useState<string>(props.cvInfo.email);
    const [phone, setPhone] = useState<string>(props.cvInfo.phone);
    const [password, setPassword] = useState<string>("");
    const [offices, setOffices] = useState<Offices>([]);
    const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
    const [alignments, setAlignments] = useState<Alignment[] | null>(null);
    const [selectedAlignment, setSelectedAlignment] = useState<string | null>(null);
    const [consentProvided, setConsentProvided] = useState<boolean>(false);

    const [validations, setValidations] = useState<FormValidation>({
        firstName: {valid: true, errors: []},
        lastName: {valid: true, errors: []},
        email: {valid: true, errors: []},
        phone: {valid: true, errors: []},
        password: {valid: true, errors: []},
        selectedOffice: {valid: true, errors: []},
        selectedAlignment: {valid: true, errors: []},
        consentProvided: {valid: true, errors: []}
    });

    const [dirtyFields, setDirtyFields] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        password: false,
        selectedOffice: false,
        selectedAlignment: false,
        consentProvided: false
    });

    useEffect(() => {
        populateOfficeData()
    }, []);

    useEffect(() => {
        populateAlignments();
        setSelectedAlignment(null);
    }, [selectedOffice]);

    useEffect(() => {
        validateForm(false);
    }, [firstName, lastName, email, phone, password, selectedOffice, selectedAlignment, consentProvided]);

    async function populateOfficeData() {
        const offices = await getOffices();
        setOffices(offices);

        const country = await getCountry();

        const selectedOffice = offices.find((office) => office.country_code === country!.country);
        setSelectedOffice(selectedOffice?.id.toString() || null);
    }

    async function populateAlignments() {
        const alignments  = await getAlignments(offices.find((office) => office.id.toString() === selectedOffice)?.country_code || "", offices);
        setAlignments(alignments);
    }

    async function getOffices(): Promise<Offices> {
        const offices = await fetch(`${process.env.NEXT_PUBLIC_GIS_API_ENDPOINT}/v2/lists/mcs_alignments.json?mc_id[]=495&amp;mc_id[]=537`);
        return await offices.json();
    }

    async function getCountry(): Promise<Country> {
        const country = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/registrations/get_country`);
        return await country.json();
    }

    async function getAlignments(countryCode: string, offices: Offices): Promise<Alignment[]> {
        const office = offices.find((office) => office.country_code === countryCode);
        return office?.alignments || [];
    }

    function validateForm(strict: boolean): boolean {
        const firstNameValidation = validateName(firstName);
        const lastNameValidation = validateName(lastName);
        const emailValidation = validateEmail(email);
        const phoneValidation = validatePhone(phone);
        const passwordValidation = validatePassword(password);
        const selectedOfficeValidation = validateOffice(selectedOffice);
        const selectedAlignmentValidation = validateAlignment(selectedAlignment);
        const consentValidation = validateConsent(consentProvided);

        setValidations({
            firstName: strict || dirtyFields.firstName ? firstNameValidation : {valid: true, errors: []},
            lastName: strict || dirtyFields.lastName ? lastNameValidation : {valid: true, errors: []},
            email: strict || dirtyFields.email ? emailValidation : {valid: true, errors: []},
            phone: strict || dirtyFields.phone ? phoneValidation : {valid: true, errors: []},
            password: strict || dirtyFields.password ? passwordValidation : {valid: true, errors: []},
            selectedOffice: strict || dirtyFields.selectedOffice ? selectedOfficeValidation : (selectedOffice === null) ? {valid: true, errors: []} : selectedOfficeValidation,
            selectedAlignment: strict || dirtyFields.selectedAlignment ? selectedAlignmentValidation : (selectedAlignment === null) ? {valid: true, errors: []} : selectedAlignmentValidation,
            consentProvided: strict || dirtyFields.consentProvided ? consentValidation : {valid: true, errors: []}
        });

        return firstNameValidation.valid && lastNameValidation.valid && emailValidation.valid && phoneValidation.valid
            && passwordValidation.valid;
    }

    function submitForm() {
        console.log(dirtyFields);

        if (validateForm(true)) {
            const data = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                password: password,
                office_id: selectedOffice,
                alignment_id: selectedAlignment
            }
            console.log(data);
        }

        console.log("Form is invalid");
    }


    return (
        <ContainerBox>
            <ContainerHeader
                title={"Create your account with AIESEC"}
                subtitle={"We need a little bit more information to finish creating your account"}
            />
            <div className={`flex flex-col space-y-5`}>

                <div className={`flex flex-row space-x-5 items-stretch`}>
                    <TextInput
                        className={`w-1/2`}
                        label="First Name"
                        value={firstName}
                        setValue={setFirstName}
                        errors={validations.firstName.errors}
                        setIsDirty={() => setDirtyFields({...dirtyFields, firstName: true})}
                    />

                    <TextInput
                        className={`w-1/2`}
                        label="Last Name"
                        value={lastName}
                        setValue={setLastName}
                        errors={validations.lastName.errors}
                        setIsDirty={() => setDirtyFields({...dirtyFields, lastName: true})}
                    />
                </div>

                <TextInput
                    type={"email"}
                    label="Email"
                    value={email}
                    setValue={setEmail}
                    errors={validations.email.errors}
                    setIsDirty={() => setDirtyFields({...dirtyFields, email: true})}
                />

                <TextInput
                    type={"tel"}
                    label="Phone"
                    value={phone}
                    setValue={setPhone}
                    errors={validations.phone.errors}
                    setIsDirty={() => setDirtyFields({...dirtyFields, phone: true})}
                />

                <TextInput
                    type={"password"}
                    label="Password"
                    value={password}
                    setValue={setPassword}
                    errors={validations.password.errors}
                    setIsDirty={() => setDirtyFields({...dirtyFields, password: true})}
                />

                <SelectInput
                    label="Country or Territory"
                    data={offices.map((office) => ({value: office.id.toString(), label: office.name}))}
                    setValue={setSelectedOffice}
                    value={selectedOffice}
                    searchable
                    errors={validations.selectedOffice.errors}
                    setIsDirty={() => setDirtyFields({...dirtyFields, selectedOffice: true})}
                />

                <SelectInput
                    label="Local Office/City"
                    data={alignments?.map((alignment) => ({value: alignment.alignment_id.toString(), label: alignment.value}))}
                    setValue={setSelectedAlignment}
                    value={selectedAlignment}
                    searchable
                    errors={validations.selectedAlignment.errors}
                    setIsDirty={() => setDirtyFields({...dirtyFields, selectedAlignment: true})}
                />

                <CheckboxInput
                    checked={consentProvided}
                    setChecked={setConsentProvided}
                    label={(
                        <div>
                            By signing up, I agree to the <a href={"https://aiesec.org/assets/documents/AIESEC_Privacy_Policy2022.pdf"}>terms & privacy conditions.</a>
                        </div>
                    )}
                    errors={validations.consentProvided.errors}
                    setIsDirty={() => setDirtyFields({...dirtyFields, consentProvided: true})}
                />

                <Button
                    onClick={submitForm}
                >
                    Create Account
                </Button>
            </div>
        </ContainerBox>
    );
}

function validateName(name: string): ValidationResult {
    const errors = [];
    if (name.length < 2) errors.push("Name must be at least 2 characters long");
    return {valid: errors.length === 0, errors};
}

function validateEmail(email: string): ValidationResult {
    const errors = [];
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) errors.push("Invalid email address");
    return {valid: errors.length === 0, errors};
}

function validatePhone(phone: string): ValidationResult {
    const errors = [];
    if (phone.length < 5) errors.push("Phone number must be at least 5 digits long");

    //can contain only +, " " and numbers
    if (!(/^[0-9\+ ]+$/.test(phone))) errors.push("Invalid phone number");
    return {valid: errors.length === 0, errors};
}

function validatePassword(password: string): ValidationResult {
    const errors = [];
    if (password.length < 8) errors.push("Password must be at least 8 characters long");
    return {valid: errors.length === 0, errors};
}

function validateOffice(office: string | null): ValidationResult {
    const errors = [];
    if (!office) errors.push("You must select your country");
    return {valid: errors.length === 0, errors};
}

function validateAlignment(alignment: string | null): ValidationResult {
    const errors = [];
    if (!alignment) errors.push("You must select your local office/city");
    return {valid: errors.length === 0, errors};
}

function validateConsent(consent: boolean): ValidationResult {
    const errors = [];
    if (!consent) errors.push("You must agree to the terms & privacy conditions");
    return {valid: errors.length === 0, errors};
}


