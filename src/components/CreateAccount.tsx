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

    useEffect(() => {
        populateOfficeData()
    }, []);

    useEffect(() => {
        populateAlignments();
        setSelectedAlignment(null);
    }, [selectedOffice]);

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
                    />

                    <TextInput
                        className={`w-1/2`}
                        label="Last Name"
                        value={lastName}
                        setValue={setLastName}
                    />
                </div>

                <TextInput
                    type={"email"}
                    label="Email"
                    value={email}
                    setValue={setEmail}
                />

                <TextInput
                    type={"tel"}
                    label="Phone"
                    value={phone}
                    setValue={setPhone}
                />

                <TextInput
                    type={"password"}
                    label="Password"
                    value={password}
                    setValue={setPassword}
                />

                <SelectInput
                    label="Country or Territory"
                    data={offices.map((office) => ({value: office.id.toString(), label: office.name}))}
                    setValue={setSelectedOffice}
                    value={selectedOffice}
                    searchable
                />

                <SelectInput
                    label="Local Office"
                    data={alignments?.map((alignment) => ({value: alignment.alignment_id.toString(), label: alignment.value}))}
                    setValue={setSelectedAlignment}
                    value={selectedAlignment}
                    searchable
                />

                <CheckboxInput
                    checked={consentProvided}
                    setChecked={setConsentProvided}
                    label={(
                        <div>
                            By signing up, I agree to the <a href={"https://aiesec.org/assets/documents/AIESEC_Privacy_Policy2022.pdf"}>terms & privacy conditions.</a>
                        </div>
                    )}
                />

                <Button
                    disabled={!consentProvided}
                    onClick={() => console.log("Create Account")}
                >
                    Create Account
                </Button>
            </div>
        </ContainerBox>
    );
}