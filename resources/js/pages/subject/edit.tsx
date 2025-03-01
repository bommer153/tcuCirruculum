import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Head, router, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'lucide-react';

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
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subject',
        href: '/subject',
    },
];





export default function Edit({ subjects }: SubjectProps) {

    const { data: subjectData, setData: subjectSetData, put: subjectPatch, processing: subjectProcessing, errors: subjectErrors, reset: subjectReset } = useForm<SubjectForm>({
        
        subjectCode: subjects.subjectCode || '',
        subjectDescription: subjects.subjectDescription || '',
    });
    
    const updateSubject: FormEventHandler = (e) => {
        e.preventDefault();
        subjectPatch(route('subjects.update', subjects.id), {   
            onSuccess: () => {
                toast.success("Subject Updated");           
            },         
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subjects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <ToastContainer />
                <form className="grid auto-rows-min gap-4 md:grid-cols-3" onSubmit={updateSubject}>
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
                        <Button type="submit" id="button" className="cursor-pointer">Update</Button>
                    </div>
                </form>                
            </div>
        </AppLayout>
    );
}
