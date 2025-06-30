import { z } from 'zod'
import { toast } from 'sonner';
import { AgentGetOne } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useForm } from "react-hook-form";
import { agentsInsertSchema } from "../schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AgentFormProps {
  onSuccess?: () => void;
  onCancle?: () => void;
  initialValues?: AgentGetOne;

}
export const AgentForm = ({ onSuccess, onCancle, initialValues }: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions())
        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })

          )
        }
        onSuccess?.();
      },

      onError: (error) => {
        toast.error(error.message)
      }

    })
  )
  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name || "",
      instructions: initialValues?.instructions || "",
    },
  })
  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (value: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("Todo : update Agent");
    } else {
      createAgent.mutate(value);
    }
  }

  return (
    <Form {...form} >
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar seed={form.watch("name")} variant='botttsNeutral' className='border size-16 -translate-y-4 rounded-full' />
        <FormField render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder='e.g. Interviewer' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} name='name' control={form.control} />
        <FormField render={({ field }) => (
          <FormItem>
            <FormLabel>Instruction</FormLabel>
            <FormControl>
              <Input {...field} placeholder='e.g. You are an javascript interviewer take my interview for full stack  developer role ' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} name='instructions' control={form.control} />
        <div className='flex justify-between gap-x-2'>
          {onCancle && (
            <Button variant="ghost" disabled={isPending} type="button" onClick={() => onCancle()}>Cancle</Button>
          )}
          <Button disabled={isPending} type="submit">{isEdit ? "Update" : "Create"} Agent</Button>
        </div>
      </form>
    </Form>
  )
}




