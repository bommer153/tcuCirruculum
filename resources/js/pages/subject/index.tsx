import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';

interface SubjectForm {
    subjectCode: string;
    subjectDescription: string;
}


interface SubjectProps {
    subjects: Array<SubjectForm>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subject',
        href: '/subject',
    },
];





export default function Subjects({ subjects }: SubjectProps) {

    const { data: subjectData, setData: subjectSetData, post: subjectPost, processing: subjectProcessing, errors: subjectErrors, reset: subjectReset } = useForm<SubjectForm>({
        subjectCode: '',
        subjectDescription: '',
    });
    
    const addSubject: FormEventHandler = (e) => {
        e.preventDefault();
        subjectPost(route('subject.store'), {
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
                    <table>
                        <thead className="">
                            <tr>
                                <th className="p-2">Subject Code</th>
                                <th className="p-2">Subject Description</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {subjects.map((subject, index) => (
                                <tr key={index}>
                                    <td className="p-2">{subject.subjectCode}</td>
                                    <td className="p-2">{subject.subjectDescription}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
