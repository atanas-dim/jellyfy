"use client";

import { PlusIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Alert } from "@/components/alert";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Checkbox } from "@/components/checkbox";
import { Dialog } from "@/components/dialog";
import { IconButton } from "@/components/icon-button";
import { Input } from "@/components/input";
import { Radio, RadioItem } from "@/components/radio";
import { Select, SelectOption } from "@/components/select";
import { Slider } from "@/components/slider";
import { Switch } from "@/components/switch";
import { Textarea } from "@/components/textarea";

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-sm font-semibold tracking-wide text-neutral-500 uppercase">
      {title}
    </h2>
    {children}
  </section>
);

export default function DevPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-10 px-6 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        Components
      </h1>

      <Block title="Button">
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="tertiary">Tertiary</Button>
        <Button color="neutral">Neutral</Button>
        <Button color="success">Success</Button>
        <Button color="error">Error</Button>
        <Button loading>Loading</Button>
      </Block>

      <Block title="Icon button">
        <div className="flex items-center gap-3">
          <IconButton label="Add">
            <PlusIcon className="size-4.5" />
          </IconButton>
          <IconButton label="Add" color="neutral">
            <PlusIcon className="size-4.5" />
          </IconButton>
          <IconButton label="Add" color="secondary" loading>
            <PlusIcon className="size-4.5" />
          </IconButton>
        </div>
      </Block>

      <Block title="Input">
        <Input label="Name" placeholder="Name" />
        <Input label="Nickname" placeholder="Nickname" color="success" />
        <Input label="Email" placeholder="Email" color="error" />
      </Block>

      <Block title="Textarea">
        <Textarea label="Note" placeholder="Note" />
        <Textarea label="Note" placeholder="Note" color="warning" />
      </Block>

      <Block title="Select">
        <Select label="Flavor" defaultValue="mint">
          <SelectOption value="mint">Mint</SelectOption>
          <SelectOption value="rose">Rose</SelectOption>
        </Select>
        <Select label="Flavor" color="error" defaultValue="rose">
          <SelectOption value="mint">Mint</SelectOption>
          <SelectOption value="rose">Rose</SelectOption>
        </Select>
      </Block>

      <Block title="Checkbox">
        <Checkbox label="Primary" defaultChecked />
        <Checkbox label="Success" color="success" defaultChecked />
        <Checkbox label="Error" color="error" />
        <Checkbox label="Invalid" invalid message="Required" />
      </Block>

      <Block title="Radio">
        <Radio label="Delivery" defaultValue="standard">
          <RadioItem value="standard">Standard</RadioItem>
          <RadioItem value="express">Express</RadioItem>
        </Radio>
        <Radio label="Plan" color="tertiary" defaultValue="plus">
          <RadioItem value="plus">Plus</RadioItem>
          <RadioItem value="pro">Pro</RadioItem>
        </Radio>
      </Block>

      <Block title="Switch">
        <Switch label="Notifications" defaultChecked />
        <Switch label="Digest" color="secondary" defaultChecked />
        <Switch label="Invalid" invalid message="Turn this on" />
      </Block>

      <Block title="Slider">
        <Slider label="Volume" defaultValue={62} />
        <Slider label="Warmth" color="warning" defaultValue={30} />
        <Slider label="Level" color="error" defaultValue={80} />
      </Block>

      <Block title="Alert">
        <Alert color="warning" title="Check the date">
          This offer ends tonight.
        </Alert>
        <Alert color="success" title="Saved">
          The draft is stored.
        </Alert>
        <Alert color="error" title="Missing name">
          Add a name before continuing.
        </Alert>
      </Block>

      <Block title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="neutral">Neutral</Badge>
        </div>
      </Block>

      <Block title="Card">
        <Card title="Plain">A white jelly panel.</Card>
        <Card title="Tinted" color="secondary">
          The same panel in secondary.
        </Card>
      </Block>

      <Block title="Dialog">
        <Dialog
          trigger="Open dialog"
          title="A note"
          description="The panel can take a color. This one stays on the surface."
        />
        <Dialog
          trigger="Open tinted"
          title="Tinted"
          color="tertiary"
          description="Tertiary panel."
        />
      </Block>
    </main>
  );
}
