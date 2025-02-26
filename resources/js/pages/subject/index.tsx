import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface SubjectForm {
    subjectCode: string;
    subjectDescription: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subject',
        href: '/subject',
    },
];




export default function Subjects() {

    const { data:subjectData, setData:subjectSetData, post:subjectPost, processing:subjectProcessing, errors:subjectErrors, reset:subjectReset } = useForm<SubjectForm>({
        subjectCode:'',
        subjectDescription:'',        
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subjects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div>
                        <Label htmlFor="subject" className="py-10">Subject Code</Label>
                        <Input
                            id="subject"
                            type="text"
                            name="subjectCode"
                            required
                            autoFocus
                            value=""
                            onChange={(e) => subjectSetData("subjectCode", e.target.value)}
                            placeholder="Subject Code"
                        />
                    </div>

                    <div>
                        <Label htmlFor="subjectDescription" className="py-10">Subject Description</Label>
                        <Input
                            id="subjectDescription"
                            type="text"
                            name="subjectDescription"
                            required
                            autoFocus
                            value=""
                            onChange={(e) => subjectSetData("subjectDescription", e.target.value)}
                            placeholder="Subject"
                        />
                    </div>

                    <div>
                        
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
