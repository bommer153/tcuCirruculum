import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


interface SubjectForm {
    subjectCode: string;
    subjectDescription: string;
}

interface SubjectData {
    id: number;
    subjectCode: string;
    subjectDescription: string;
}

interface SubjectProps {
    subjects: Array<SubjectData>
    success: string,
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subject',
        href: '/subject',
    },
];





export default function Subjects({ subjects, success }: SubjectProps) {

    const [successMessage, setSuccessMessage] = useState(success || null);
  
    useEffect(() =>{    
        if(successMessage) {
            toast.success(successMessage)
            setSuccessMessage(null);
        }        
        
    }),[successMessage]

    const { data: subjectData, setData: subjectSetData, post: subjectPost, processing: subjectProcessing, errors: subjectErrors, reset: subjectReset } = useForm<SubjectForm>({
        subjectCode: '',
        subjectDescription: '',
    });    
    
    const addSubject: FormEventHandler = (e) => {
        e.preventDefault();
        subjectPost(route('subjects.store'), {
            onFinish: () =>
                [
                    subjectReset('subjectCode'),
                    subjectReset('subjectDescription'),
                ],         
                   
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subjects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <ToastContainer />
                <form className="grid auto-rows-min gap-4 md:grid-cols-3" onSubmit={addSubject}>
                    <div>
                        <Label htmlFor="subject" className="py-10">Subject Code</Label>
                        <Input
                            id="subject"
                            type="text"
                            name="subjectCode"
                            required
                            autoFocus
                            value={subjectData.subjectCode}
                            onChange={(e) => subjectSetData("subjectCode", e.target.value)}

                        />
                        <InputError message={subjectErrors.subjectCode} />
                    </div>

                    <div>
                        <Label htmlFor="subjectDescription" className="py-10">Subject Description</Label>
                        <Input
                            id="subjectDescription"
                            type="text"
                            name="subjectDescription"
                            required
                            autoFocus
                            value={subjectData.subjectDescription}
                            onChange={(e) => subjectSetData("subjectDescription", e.target.value)}
                        />
                        <InputError message={subjectErrors.subjectDescription} />
                    </div>

                    <div>
                        <Label htmlFor="button" className="py-10"><br></br></Label>
                        <Button type="submit" id="button" className="cursor-pointer">Add Subject</Button>
                    </div>
                </form>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="p-2">Subject Code</TableHead>
                                <TableHead className="p-2">Subject Description</TableHead>
                                <TableHead className="p-2"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {subjects.map((subject, index) => (
                                <TableRow key={index}>
                                    <TableCell className="p-2">{subject.subjectCode}</TableCell>
                                    <TableCell className="p-2">{subject.subjectDescription}</TableCell>
                                    <TableCell className="p-2">
                                        <Link href={route('subjects.edit',subject.id)} >
                                            <Button className="mr-5 bg-blue-200 cursor-pointer">Edit</Button>
                                        </Link>
                                        <Button className="mr-5 bg-red-500 cursor-pointer text-white">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
