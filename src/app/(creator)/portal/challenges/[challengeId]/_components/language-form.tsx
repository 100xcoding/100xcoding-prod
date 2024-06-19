"use client";
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combo-box';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { ChallengeTechSchema } from '@/schema/challenge-schema';
import { useCreatorChallengeById } from '@/services/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { Challenge } from '@prisma/client';
import { Pencil } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateChallengeTechAction } from '../../_actions';
interface LanguageFormProps {
    initialData: Challenge;
    challengeId: string;
    options: { label: string; value: string }[];
}

export const LanguageForm = ({ initialData, challengeId, options }: LanguageFormProps) => {
    const { refreshCreatorChallengeData } = useCreatorChallengeById(challengeId);
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = useCallback(() => setIsEditing(current => !current), []);
    const form = useForm<z.infer<typeof ChallengeTechSchema>>({
        resolver: zodResolver(ChallengeTechSchema),
        defaultValues: useMemo(() => ({
            challengeTechId: initialData?.challengeTechId || "",
        }), [initialData])
    });
    const { control, handleSubmit } = form;
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = useCallback(async (values: z.infer<typeof ChallengeTechSchema>) => {
        const response = await updateChallengeTechAction(values, challengeId);
        console.log(response);
        if (response?.success) {
            setIsEditing(false);
            refreshCreatorChallengeData();
            toast.success(response.message);
        } else {
            toast.error(response?.message);
        }

    }, [challengeId, refreshCreatorChallengeData]);
    const selectedOption = useMemo(() => {
        return options?.find(option => option?.value === initialData?.challengeTechId);
    }, [options, initialData?.challengeTechId]);
    return (
        <div className="mt-6  dark:bg-muted rounded-md p-4">
            <div className="font-medium flex items-center justify-between tracking-wide">
                Challenge Tech Stack
                <Button
                    onClick={toggleEdit}
                    variant="ghost"
                    className="cursor-pointer"
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit title
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && <>
                <p
                    className={cn(
                        "text-sm mt-2 capitalize",
                        !initialData?.challengeTechId && "text-slate-500 italic"
                    )}
                >
                    {selectedOption?.label || "No Tech Stack"}
                </p>
            </>}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={control}
                            name="challengeTechId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox

                                            options={options}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
