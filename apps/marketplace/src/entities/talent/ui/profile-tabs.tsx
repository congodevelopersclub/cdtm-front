"use client"

import { useTranslations } from "next-intl"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { ExperienceTab } from "./experience-tab"
import { MyStoryTab } from "./my-story-tab"
import { ProjectsTab } from "./projects-tab"
import { SkillsTab } from "./skills-tab"

import type { TalentProfile } from "../model/types"

type ProfileTabsProps = {
  profile: TalentProfile
}

export function ProfileTabs({ profile }: ProfileTabsProps) {
  const t = useTranslations("Profile")
  const showExperienceTab = profile.experience.length > 0

  return (
    <Tabs defaultValue="story" className="w-full">
      <TabsList variant="line" className="h-auto w-full justify-start gap-6 border-b border-border bg-transparent p-0 pb-0">
        <TabsTrigger
          value="story"
          className="rounded-none px-0 pb-3 after:bg-brand-orange data-active:text-foreground"
        >
          {t("myStory")}
        </TabsTrigger>
        <TabsTrigger
          value="skills"
          className="rounded-none px-0 pb-3 after:bg-brand-orange data-active:text-foreground"
        >
          {t("skills")}
        </TabsTrigger>
        <TabsTrigger
          value="projects"
          className="rounded-none px-0 pb-3 after:bg-brand-orange data-active:text-foreground"
        >
          {t("projects")}
        </TabsTrigger>
        {showExperienceTab ? (
          <TabsTrigger
            value="experience"
            className="rounded-none px-0 pb-3 after:bg-brand-orange data-active:text-foreground"
          >
            {t("experienceTab")}
          </TabsTrigger>
        ) : null}
      </TabsList>
      <TabsContent value="story">
        <MyStoryTab profile={profile} />
      </TabsContent>
      <TabsContent value="skills">
        <SkillsTab profile={profile} />
      </TabsContent>
      <TabsContent value="projects">
        <ProjectsTab profile={profile} />
      </TabsContent>
      {showExperienceTab ? (
        <TabsContent value="experience">
          <ExperienceTab profile={profile} />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
